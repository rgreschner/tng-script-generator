import 'package:inject/inject.dart';
import 'package:tng_scriptgen_flutter_app/services/script_generator_api_client.dart';
import 'package:tng_scriptgen_flutter_app/services/script_repository.dart';

@provide
@singleton
class ScriptSyncService {

  final ScriptRepository _repository;
  final ScriptGeneratorApiClient _scriptGeneratorApiClient;

  ScriptSyncService(this._repository, this._scriptGeneratorApiClient);

  sync() async {
    await _repository.initialize();
    await _repository.clear();

    final remoteScripts = await _scriptGeneratorApiClient.getScriptsByMe();
    for (var script in remoteScripts) {
      script['originalId'] = script['_id'];
      script['_id'] = null;
      await _repository.save(script);
    }
    var found = await _repository.findAll();
    found = found;
  }

}