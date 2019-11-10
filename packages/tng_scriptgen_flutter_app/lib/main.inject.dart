import 'main.dart' as _i1;
import 'services/script_repository.dart' as _i2;
import 'services/script_generator_api_client.dart' as _i3;
import 'services/script_sync_service.dart' as _i4;
import 'dart:async' as _i5;

class Main$Injector implements _i1.Main {
  Main$Injector._();

  _i2.ScriptRepository _singletonScriptRepository;

  _i3.ScriptGeneratorApiClient _singletonScriptGeneratorApiClient;

  _i4.ScriptSyncService _singletonScriptSyncService;

  static _i5.Future<_i1.Main> create() async {
    final injector = Main$Injector._();

    return injector;
  }

  _i1.MyApp _createMyApp() => _i1.MyApp(_createScriptRepository(),
      _createScriptSyncService(), _createScriptGeneratorApiClient());
  _i2.ScriptRepository _createScriptRepository() =>
      _singletonScriptRepository ??= _i2.ScriptRepository();
  _i4.ScriptSyncService _createScriptSyncService() =>
      _singletonScriptSyncService ??= _i4.ScriptSyncService(
          _createScriptRepository(), _createScriptGeneratorApiClient());
  _i3.ScriptGeneratorApiClient _createScriptGeneratorApiClient() =>
      _singletonScriptGeneratorApiClient ??= _i3.ScriptGeneratorApiClient();
  @override
  _i1.MyApp get app => _createMyApp();
}
