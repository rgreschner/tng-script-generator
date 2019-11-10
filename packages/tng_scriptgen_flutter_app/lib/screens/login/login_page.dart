import 'package:flutter/material.dart';
import 'package:inject/inject.dart';
import 'package:tng_scriptgen_flutter_app/services/script_generator_api_client.dart';

@provide
class LoginPage extends StatefulWidget {
  ScriptGeneratorApiClient _scriptGeneratorApiClient;

  LoginPage(this._scriptGeneratorApiClient);

  static String tag = 'login-page';

  @override
  LoginPageState createState() => new LoginPageState(_scriptGeneratorApiClient);
}

class LoginPageState extends State<LoginPage> {
  ScriptGeneratorApiClient _scriptGeneratorApiClient;

  LoginPageState(this._scriptGeneratorApiClient);

  @override
  Widget build(BuildContext context) {
    final usernameController = TextEditingController();
    final passwordController = TextEditingController();

    final logo = Text('TNG Script Generator Mobile App',
        style: TextStyle(
          fontSize: 48.0,
          fontWeight: FontWeight.bold,
        ),
        textAlign: TextAlign.center);

    final usernameInput = TextFormField(
      controller: usernameController,
      keyboardType: TextInputType.text,
      autofocus: false,
      decoration: InputDecoration(
        hintText: 'Username',
        contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(32.0)),
      ),
    );

    final passwordInput = TextFormField(
      controller: passwordController,
      autofocus: false,
      obscureText: true,
      decoration: InputDecoration(
        hintText: 'Password',
        contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(32.0)),
      ),
    );

    final loginButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: Builder(
        builder: (context) => RaisedButton(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
          ),
          onPressed: () async {
            try {
              await this
                  .login(usernameController.text, passwordController.text);
              Navigator.of(context).pushNamed('/home');
            } catch (err) {
              final scaffold = Scaffold.of(context);
              scaffold.showSnackBar(SnackBar(
                content: const Text('Login failed.'),
              ));
            }
          },
          padding: EdgeInsets.all(18),
          color: Colors.lightBlueAccent,
          child: Text('Log In', style: TextStyle(color: Colors.white)),
        ),
      ),
    );

    final registerButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: Builder(
        builder: (context) => RaisedButton(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
          ),
          onPressed: () async {
            try {
              await this
                  .register(usernameController.text, passwordController.text);
              final scaffold = Scaffold.of(context);
              scaffold.showSnackBar(SnackBar(
                content: const Text('Registered new user.'),
              ));
            } catch (err) {
              final scaffold = Scaffold.of(context);
              scaffold.showSnackBar(SnackBar(
                content: const Text('Error registering new user.'),
              ));
            }
          },
          padding: EdgeInsets.all(18),
          color: Colors.lightBlueAccent,
          child: Text('Register', style: TextStyle(color: Colors.white)),
        ),
      ),
    );

    final forgotLabel = FlatButton(
      child: Text(
        'Skip',
        style: TextStyle(color: Colors.black54),
      ),
      onPressed: () {
        Navigator.of(context).pushNamed('/home');
      },
    );

    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children: <Widget>[
            logo,
            SizedBox(height: 48.0),
            usernameInput,
            SizedBox(height: 8.0),
            passwordInput,
            SizedBox(height: 24.0),
            loginButton,
            registerButton,
            forgotLabel,
          ],
        ),
      ),
    );
  }

  login(username, password) async {
    final data = await this._scriptGeneratorApiClient.login(username, password);
    this._scriptGeneratorApiClient.setToken(data['jwt']);
  }

  register(username, password) async {
    await this._scriptGeneratorApiClient.register(username, password);
  }
}
