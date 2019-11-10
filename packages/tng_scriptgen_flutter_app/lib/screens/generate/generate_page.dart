import 'package:flutter/material.dart';
import 'package:flutter_credit_card/credit_card_form.dart';
import 'package:flutter_credit_card/credit_card_model.dart';
import 'package:flutter_credit_card/flutter_credit_card.dart';
import 'package:inject/inject.dart';
import 'package:tng_scriptgen_flutter_app/services/script_generator_api_client.dart';

@provide
class GeneratePage extends StatefulWidget {
  ScriptGeneratorApiClient _scriptGeneratorApiClient;

  GeneratePage(this._scriptGeneratorApiClient);

  @override
  State<StatefulWidget> createState() {
    return GeneratePageState(_scriptGeneratorApiClient);
  }
}

class GeneratePageState extends State<GeneratePage> {
  String cardNumber = '';
  String expiryDate = '';
  String cardHolderName = '';
  String cvvCode = '';
  bool isCvvFocused = false;
  bool canContinue = false;

  ScriptGeneratorApiClient _scriptGeneratorApiClient;

  GeneratePageState(this._scriptGeneratorApiClient);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('Scripts')),
        body: SafeArea(
          child: Column(
            children: <Widget>[
              Text(
                  'For debugging purposes, enter the credit card number 5555 5555 5555 4444 and any validity date plus postal code.',
                  style: TextStyle(
                    fontSize: 12.0,
                  ),
                  textAlign: TextAlign.center),
              Text(
                  'NO ACTUAL CHARGE IS TAKING PLACE.',
                  style: TextStyle(
                    fontSize: 12.0,
                  ),
                  textAlign: TextAlign.center),
              CreditCardWidget(
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cardHolderName: cardHolderName,
                cvvCode: cvvCode,
                showBackView: isCvvFocused,
              ),
              Expanded(
                child: SingleChildScrollView(
                  child: CreditCardForm(
                    onCreditCardModelChange: onCreditCardModelChange,
                  ),
                ),
              ),
              Builder(
                builder: (context) => RaisedButton(
                  onPressed: !canContinue
                      ? null
                      : () async {
                          await _scriptGeneratorApiClient.generateNewScript();
                          setState(() {
                            final scaffold = Scaffold.of(context);
                            scaffold.showSnackBar(SnackBar(
                              content: const Text(
                                  'Started new script generation, please sync list in a few minutes!'),
                            ));
                          });
                          await Future.delayed(
                              const Duration(milliseconds: 2000));
                          Navigator.of(context).pushNamed('/home');
                        },
                  padding: EdgeInsets.all(12),
                  color: Colors.lightBlueAccent,
                  child:
                      Text('Generate', style: TextStyle(color: Colors.white)),
                ),
              ),
            ],
          ),
        ));
  }

  void onCreditCardModelChange(CreditCardModel creditCardModel) {
    setState(() {
      cardNumber = creditCardModel.cardNumber;
      expiryDate = creditCardModel.expiryDate;
      cardHolderName = creditCardModel.cardHolderName;
      cvvCode = creditCardModel.cvvCode;
      isCvvFocused = creditCardModel.isCvvFocused;
      canContinue = cardNumber != '' && expiryDate != '' && cvvCode != '';
    });
  }
}
