import { Observable, EventData } from "data/observable";
import { Button } from "ui/button";
import { DatePicker } from "ui/date-picker";

import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import * as frameModule from "ui/frame"; 

export class UiViewModel extends Observable {
    
    public goToCuriosityPage(args: EventData) {
        var button = <Button>args.object;
        var dt = <DatePicker>button.parent.getViewById("dt-cur");

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": dt.year, "month": dt.month, "day": dt.day }
        });
    }

    public goToOpportunityPage(args: EventData) {
        var button = <Button>args.object;
        var dt = <DatePicker>button.parent.getViewById("dt-opp");

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": dt.year, "month": dt.month, "day": dt.day }
        });
    }

    public goToSpiritPage(args: EventData) {
        var button = <Button>args.object;
        var dt = <DatePicker>button.parent.getViewById("dt-spi");

        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": button.text.toLowerCase(), "year": dt.year, "month": dt.month, "day": dt.day }
        });
    }
}