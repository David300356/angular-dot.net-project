import { Component } from '@angular/core';
import { SideNavItem } from '../models/models';

@Component({
  selector: 'side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  sideNavContent: SideNavItem[] = [
    {
      icon:'insert_chart',
      title: 'Stations',
      link: 'station/stations',
    },
    {
      icon:'how_to_reg',
      title: 'Officers',
      link: 'officers/police',
    },
    {
      icon:'business',
      title: 'reports',
      link: 'report/list',
    },
    {
      icon:'tag_faces',
      title: 'witnesses',
      link: 'wit/list',
    },
    {
      icon:'mood_bad',
      title: 'suspects',
      link: 'sus/list',
    },
    {
      icon:'table_chart',
      title: 'Findings',
      link: 'finding/list',
    },
    {
      icon:'person',
      title: 'Users',
      link: 'users/list',
    },
    {
      icon:'departure_board',
      title: 'arrest',
      link: 'arrest/all-arrest',
    }
  ];
}
