import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

interface Report {
  userReporting: { name: string; email: string; avatar: string };
  userReported: { name: string; email: string; avatar: string };
  date: string;
  reason: string;
  explanation: string;
  details: string;
}

@Component({
  selector: 'app-reports-list',
  imports: [
    NgForOf
  ],
  templateUrl: './reports-list.component.html',
  standalone: true,
  styleUrl: './reports-list.component.css'
})
export class ReportsListComponent {

  @Input() reports: Report[] = [
    {
      userReporting: { name: 'Juana María Rodríguez', email: 'juanamaria@gmail.com', avatar: 'https://via.placeholder.com/40' },
      userReported: { name: 'Pepito Sánchez Méndez', email: 'pepitosanchez@gmail.com', avatar: 'https://via.placeholder.com/40' },
      date: '02/09/2023',
      reason: 'Misbehavior',
      explanation: 'Explicit Content',
      details: 'He sent me explicit content.'
    },{
      userReporting: { name: 'Juana María Rodríguez', email: 'juanamaria@gmail.com', avatar: 'https://via.placeholder.com/40' },
      userReported: { name: 'Pepito Sánchez Méndez', email: 'pepitosanchez@gmail.com', avatar: 'https://via.placeholder.com/40' },
      date: '02/09/2023',
      reason: 'Misbehavior',
      explanation: 'Explicit Content',
      details: 'He sent me explicit content.'
    }
  ];
}
