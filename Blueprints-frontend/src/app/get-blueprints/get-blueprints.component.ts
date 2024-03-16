import { Component} from '@angular/core';
import { Blueprint} from '../blueprint';
import { BlueprintService } from '../blueprint.service';

@Component({
  selector: 'app-get-blueprints',
  templateUrl: './get-blueprints.component.html',
  styleUrl: './get-blueprints.component.css'
})
export class GetBlueprintsComponent{

  blueprints:Blueprint[];
  flagDiv:Boolean = false;
  author:string;
  amountOfPoints:number;
  name:string;
  blueprintName:string;
  blueprint:Blueprint;

  constructor(private blueprintServices:BlueprintService){

  }

  //Method to send the petition for getting blueprints
  onSubmit(){
    if(this.author != undefined && this.author !=""){
      this.getBlueprintsByAuthor();
    }
  }

  //Method to open the blueprint
  openBlueprint(name: string) {
    this.blueprintName = name;
    this.getBlueprintByNameandAuthor();
  }

  //Set author name
  private setName(){
    this.name = this.author + "'s" + " " + "blueprints:"; 
  }

  //Set amount of total Amount of points
  private setAmountOfPoints(){
    this.amountOfPoints = this.blueprints.reduce((total, blueprint) => total + blueprint.amountOfPoints, 0);
  }

  //get all blueprint's with the name author's
  private getBlueprintsByAuthor(){
    try {
      this.blueprintServices.getBlueprintsByAuthor(this.author).subscribe(data => {
        this.blueprints = data;
        this.setName();
        this.setAmountOfPoints();
        this.flagDiv = true;
      });
    } catch (error) {
      console.log('Error en getBlueprintsByAuthor:', error);
    }
  }

  //Get the blueprint with the blueprint's name an author's name
  private getBlueprintByNameandAuthor() {
    try {
      this.blueprintServices.getBlueprintsByNameAndAuthor(this.author, this.blueprintName).subscribe(data => {
        this.blueprint = data;
        this.drawBlueprint(this.blueprint);
      });
    } catch (error) {
      console.log('Error en getBlueprintByNameandAuthor:', error);
    }
  }

  //Draw canvas 
  private drawBlueprint(blueprint: Blueprint | null | undefined) {
    if (!blueprint) {
      console.error('El plano es nulo o indefinido');
      return;
    }
  
    const canvas = document.getElementById('Canvas') as HTMLCanvasElement;
    if (!canvas) {
      console.error('No se pudo encontrar el elemento canvas');
      return;
    }
  
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('No se pudo obtener el contexto 2D del canvas');
      return;
    }
    
    //Clean the canvas beforte to draw
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    //Fix the syle of the lines
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    
    //Draw the line
    for (let i = 0; i < blueprint.points.length - 1; i++) {
      const startPoint = blueprint.points[i];
      const endPoint = blueprint.points[i + 1];
      context.beginPath();
      context.moveTo(startPoint.x, startPoint.y);
      context.lineTo(endPoint.x, endPoint.y);
      context.stroke();
    }
  }

}
