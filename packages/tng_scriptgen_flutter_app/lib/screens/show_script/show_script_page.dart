import 'package:flutter/material.dart';
import 'package:inject/inject.dart';
import 'package:tng_scriptgen_flutter_app/services/script_repository.dart';
import 'package:tng_scriptgen_flutter_app/services/script_sync_service.dart';

@provide
class ShowScriptPage extends StatefulWidget {

  ScriptRepository _scriptRepository;
  ShowScriptPage(this._scriptRepository);

  @override
  ShowScriptPageState createState() => ShowScriptPageState(this._scriptRepository);

}


class ShowScriptPageState extends State<ShowScriptPage> {

  String _scriptText = '';
  String _scriptTitle = "";
  ScriptRepository _scriptRepository;

  ShowScriptPageState(this._scriptRepository);

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text(this._scriptTitle),
      ),
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                _scriptText,
                // Setting the style for the Text
                style: TextStyle(fontSize: 20.0,),
                textAlign: TextAlign.center,
              ),

            ],
          ),
        ),
      ),
    );
  }

  @override
  initState() {
    super.initState();
    myAsyncInit();
  }

  myAsyncInit() async {
    new Future.delayed(Duration.zero,() async {
      final originalId = ModalRoute.of(context).settings.arguments;
      final script = await this._scriptRepository.findOneByOriginalId(originalId);
      this.setState(() {
        _scriptTitle = script['title'];
        _scriptText = script['scriptText'];
      });
    });
  }

}