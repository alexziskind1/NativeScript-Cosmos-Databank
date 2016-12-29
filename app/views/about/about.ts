import { Page } from "ui/page";
import { EventData } from "data/observable";

export function onLoaded(args: EventData) {
    let page = <Page>args.object;
}
