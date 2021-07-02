import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Exercise } from '../exercise.model';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] | any; 
  exerciseSubscription:Subscription | any;
  constructor(private trainingservice: TrainingService) { }

  ngOnInit(): void {
   this.exerciseSubscription = this.trainingservice.exercisesChanged.subscribe(exercises => (this.exercises = exercises));
    this.trainingservice.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm)
  {
    this.trainingservice.startExercise(form.value.exercise);
  }

  ngOnDestroy()
  {
    this.exerciseSubscription.unsubscribe();
  }

}
