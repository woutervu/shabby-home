import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ScenesPage } from "../scenes/scenes";
import { RoutinesPage} from "../routines/routines";
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ScenesPage;
  tab3Root = RoutinesPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
