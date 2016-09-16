import { AsteroidViewModel } from "../../models/asteroid/asteroid-view-model";
var vm = new AsteroidViewModel();

export function onPageLoaded(args) {
    var page = args.object;

    vm.initDataItems();

    

    page.bindingContext = vm;
}