function doGet(e){
    var app = buildUiApp();
    return app;
}

function submitConfirm(e){
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
