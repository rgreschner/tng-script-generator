import 'package:flutter/material.dart';
import 'package:tng_scriptgen_flutter_app/services/script_repository.dart';
import 'package:tng_scriptgen_flutter_app/services/script_sync_service.dart';

class ScriptListPage extends StatefulWidget {
  ScriptRepository _scriptRepository;
  ScriptSyncService _scriptSyncService;

  ScriptListPage(this._scriptRepository, this._scriptSyncService);

  @override
  ScriptListPageState createState() =>
      ScriptListPageState(_scriptRepository, _scriptSyncService);
}

class ScriptListPageState extends State<ScriptListPage> {
  ScriptRepository _scriptRepository;
  ScriptSyncService _scriptSyncService;

  ScriptListPageState(this._scriptRepository, this._scriptSyncService);

  List items = List();
  Map selectedItem;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('Scripts'), actions: <Widget>[
          // action button
          Builder(builder: (BuildContext context) {
            return IconButton(
                icon: Icon(Icons.file_download),
                onPressed: () async {
                  final scaffold = Scaffold.of(context);
                  scaffold.showSnackBar(SnackBar(
                    content: const Text('Started sync......'),
                  ));
                  try {
                    await syncScripts();
                  } catch (err) {
                    scaffold.showSnackBar(SnackBar(
                      content: const Text('Sync failed!'),
                    ));
                    return;
                  }
                  scaffold.showSnackBar(SnackBar(
                    content: const Text('Sync finished!'),
                  ));
                });
          }),
        ]),
        body: ListView.builder(
            itemCount: items.length,
            itemBuilder: (context, index) {
              return ScriptListTile(items[index], () {
                setState(() {
                  selectedItem = items[index];
                  final isCompleted = selectedItem["status"] == 'completed';
                  if (!isCompleted) {
                    final scaffold = Scaffold.of(context);
                    scaffold.showSnackBar(SnackBar(
                      content: const Text(
                          'Script is still generating, please try again later!'),
                    ));
                    return;
                  }
                  Navigator.of(context).pushNamed('/script',
                      arguments: selectedItem['originalId']);
                });
              });
            }));
  }

  @override
  initState() {
    super.initState();
    loadScripts();
  }

  syncScripts() async {
    await _scriptSyncService.sync();
    await this.loadScripts();
  }

  loadScripts() async {
    final newItems = await this._scriptRepository.findAll();
    this.setState(() {
      this.items.clear();
      this.items.addAll(newItems);
    });
  }
}

class ScriptListTile extends ListTile {
  ScriptListTile(script, onTap)
      : super(
            title: Text(script['title']),
            leading: CircleAvatar(
              backgroundColor:
                  script["status"] == 'completed' ? Colors.green : Colors.red,
              child: Text((script['status'][0] as String).toUpperCase()),
            ),
            onTap: onTap) {}
}
