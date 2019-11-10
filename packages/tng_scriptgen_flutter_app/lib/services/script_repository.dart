import 'package:inject/inject.dart';
import 'package:path_provider/path_provider.dart';
import 'package:objectdb/objectdb.dart';
import 'dart:io';

@provide
@singleton
class ScriptRepository {

  ObjectDB db;

  Future<List<Map>> findAll() {
    return db.find({});
  }

  Future<Map> findOneByOriginalId(String originalId) {
    return db.first({'originalId': originalId});
  }

  Future save(doc) async {
    await db.remove({'originalId': doc['originalId']});
    await db.insert(doc);
  }

  Future clear() async {
    await db.remove({});
  }

  initialize() async {
    // get document directory using path_provider plugin
    Directory appDocDir = await getApplicationDocumentsDirectory();

    String dbFilePath = [appDocDir.path, 'user.db'].join('/');

    // delete old database file if exists
    File dbFile = File(dbFilePath);

    // initialize and open database
    db = ObjectDB(dbFilePath);
    db.open();
  }

}