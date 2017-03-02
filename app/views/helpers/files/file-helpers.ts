import * as application from "application";
import * as fileSystem from "file-system";
import * as enums from "ui/enums";
import { Button } from "ui/button";
import { ImageSource, fromData } from "image-source";

if (application.android) {
    var okhttp = require("nativescript-okhttp");
}

export function setCurrentImage(imageUri:string): ImageSource {
    // USING okhttp as redirects are not working for HTTP module (with or withouut dontFollowRedirects option)
    var inputStream = okhttp.getImage(imageUri); 
    var image = fromData(inputStream);
    
    return image;
}


export function setUserInteraction(shareButton: Button, saveButton: Button, desktopButton: Button, state: boolean) {
    shareButton.isUserInteractionEnabled = state;
    saveButton.isUserInteractionEnabled = state;
    desktopButton.isUserInteractionEnabled = state;
}

export function setButtonsOpacity(shareButton: Button, saveButton: Button, desktopButton: Button, value: number) {
    saveButton.opacity = value;
    desktopButton.opacity = value;
    shareButton.opacity = value;
}

export function saveFile(res: ImageSource, url: string, currentSavedPath: string) {
    var fileName = url.substring(url.lastIndexOf("/") + 1);
    var n = fileName.indexOf(".");
    fileName = fileName.substring(0, n !== -1 ? n : fileName.length) + ".jpeg";

    var cosmosFolderPath;
    if (application.android) {
        var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        cosmosFolderPath = fileSystem.path.join(androidDownloadsPath, "CosmosDataBank");
    } else if (application.ios) {
        // TODO :  this works - but where are the images ?
        var iosDownloadPath = fileSystem.knownFolders.documents();
        cosmosFolderPath = fileSystem.path.join(iosDownloadPath.path, "CosmosDataBank");
    }

    var folder = fileSystem.Folder.fromPath(cosmosFolderPath);
    var path = fileSystem.path.join(cosmosFolderPath, fileName);
    var exists = fileSystem.File.exists(path);

    if (!exists) {
        var saved = res.saveToFile(path, "jpeg");
    }

    currentSavedPath = path;
}