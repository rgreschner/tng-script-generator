import 'package:flutter/material.dart';
import 'package:inject/inject.dart';
import 'package:tng_scriptgen_flutter_app/screens/generate/generate_page.dart';
import 'package:tng_scriptgen_flutter_app/screens/home/home_page.dart';
import 'package:tng_scriptgen_flutter_app/screens/login/login_page.dart';
import 'package:tng_scriptgen_flutter_app/screens/script-list/script_list_page.dart';
import 'package:tng_scriptgen_flutter_app/screens/show_script/show_script_page.dart';
import 'package:tng_scriptgen_flutter_app/services/script_generator_api_client.dart';
import 'package:tng_scriptgen_flutter_app/services/script_repository.dart';
import 'package:tng_scriptgen_flutter_app/services/script_sync_service.dart';
import 'main.inject.dart' as g;

@Injector()
abstract class Main {
  @provide
  MyApp get app;
  static Future<Main> create(
      ) async {
    return await g.Main$Injector.create();
  }
}

void main() async {
  var container = await Main.create();
  runApp(container.app);
}

@provide
class MyApp extends StatelessWidget {

  final ScriptGeneratorApiClient _scriptGeneratorApiClient;
  final ScriptSyncService _scriptSyncService;
  final ScriptRepository _scriptRepository;


  MyApp(this._scriptRepository, this._scriptSyncService, this._scriptGeneratorApiClient) {
    this._scriptRepository.initialize();
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: LoginPage(_scriptGeneratorApiClient),
      routes: <String, WidgetBuilder>{
        // Set named routes
        '/login': (BuildContext context) => LoginPage(_scriptGeneratorApiClient),
        '/home': (BuildContext context) => HomePage(),
        '/generate': (BuildContext context) => GeneratePage(_scriptGeneratorApiClient),
        '/script-list': (BuildContext context) => ScriptListPage(this._scriptRepository, this._scriptSyncService),
        '/script': (BuildContext context) => ShowScriptPage(this._scriptRepository),
      },
    );
  }
}

/*

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() async {
    debugPrint('\n\n 🍎 🍎 🍎  setting remote MongoDB Stitch App ID ....');
    /*
    var res = await MongodbMobile.setAppID({
      'appID': 'tng-scriptgen-ymoql',
      'type': MongodbMobile.ATLAS_DATABASE,
    });
    var carrier = Carrier(db: 'tng-script-gen', collection: 'scripts');
    var syncResult = await MongodbMobile.sync(carrier);
    Future.delayed(const Duration(milliseconds: 2000), () async
    {
      final documents = await MongodbMobile.getAll(carrier);
      for (var document in documents) {
        developer.log('document: ' + json.encode(document));
      }
    });
    */
    final apiClient = new ScriptGeneratorApiClient();
    final result = await apiClient.generateNewScript();
    final result2 = await apiClient.getScriptsByMe();
    debugPrint('\n\n 🍎 🍎 🍎  setting remote MongoDB Stitch App ID ....');
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

 */