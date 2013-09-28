function doGet(e){
    var app = buildUiApp();
    return app;
}

function registSelected(e){
    var app = UiApp.getActiveApplication();
    var registRadio = app.getElementById('registRadio');

    registRadio.setText('登録するよ！');

    app.close();
    return app;
}

function deleteSelected(e){
    var app = UiApp.getActiveApplication();
    var deleteRadio = app.getElementById('deleteRadio');

    deleteRadio.setText('削除するよ！');

    app.close();
    return app;
}

function confirmInputData(e){
    var app = UiApp.getActiveApplication();
    var confirmDialog = createConfirmDialog(app);

    confirmDialog.show();

    app.close();
    return app;
}

function submitData(e){
    var app = UiApp.getActiveApplication();
    var dialog = app.getElementById('confirmDialog');

    dialog.hide();

    app.close();
    return app;
}

function closeConfirmDialog(e){
    var app = UiApp.getActiveApplication();
    var dialog = app.getElementById('confirmDialog');

    dialog.hide();

    app.close();
    return app;
}
