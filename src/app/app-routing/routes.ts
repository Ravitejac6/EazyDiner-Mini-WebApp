import {Routes} from "@angular/router";
import { FoodComponent } from "../components/food/food.component";
import { HomeComponent } from "../components/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import { SignupComponent } from "../components/signup/signup.component";

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:"signup", component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'food',component:FoodComponent}
];