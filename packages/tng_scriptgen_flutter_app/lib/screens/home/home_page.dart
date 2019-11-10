import 'package:flutter/material.dart';
import 'package:inject/inject.dart';
import 'package:tng_scriptgen_flutter_app/services/script_repository.dart';
import 'package:tng_scriptgen_flutter_app/services/script_sync_service.dart';

@provide
class HomePage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Home Page"),
      ),
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 2.0),
        child: GridView.count(
          crossAxisCount: 2,
          padding: EdgeInsets.all(3.0),
          children: <Widget>[
            makeDashboardItem("Script List", Icons.book, () {
              Navigator.of(context).pushNamed('/script-list');
            }),
            makeDashboardItem("Generate", Icons.book, () {
              Navigator.of(context).pushNamed('/generate');
            }),
          ],
        ),
      ),
    );
  }

  Card makeDashboardItem(String title, IconData icon, Function onTap) {
    return Card(
        elevation: 1.0,
        margin: new EdgeInsets.all(8.0),
        child: Container(
          decoration: BoxDecoration(color: Color.fromRGBO(220, 220, 220, 1.0)),
          child: new InkWell(
            onTap: onTap,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              verticalDirection: VerticalDirection.down,
              children: <Widget>[
                SizedBox(height: 50.0),
                Center(
                    child: Icon(
                      icon,
                      size: 40.0,
                      color: Colors.black,
                    )),
                SizedBox(height: 20.0),
                new Center(
                  child: new Text(title,
                      style:
                      new TextStyle(fontSize: 18.0, color: Colors.black)),
                )
              ],
            ),
          ),
        ));
  }

}




/*
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                "Home Page\nClick on below icon to goto About Page",
                // Setting the style for the Text
                style: TextStyle(fontSize: 20.0,),
                textAlign: TextAlign.center,
              ),
              IconButton(
                icon: Icon(
                  Icons.info,
                  color: Colors.blue,
                ),
                onPressed: () async {

                },
                iconSize: 80.0,
              )
            ],
          ),
        ),

         */