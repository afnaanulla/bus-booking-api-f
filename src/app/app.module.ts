import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BoardingComponent } from './boarding/boarding.component';
import { CommonModule } from '@angular/common';

imports:[BrowserModule, HttpClientModule]
declarations:[BoardingComponent, CommonModule]