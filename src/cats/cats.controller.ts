import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import {  of } from 'rxjs';
import { Response } from 'express';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';
import { CatsService } from './cats.service';



@Controller('cats')
export class CatsController {
  constructor(private readonly catsService : CatsService) {
  }
  @Get()
  findAll(@Res() res:Response){
    return this.catsService.findAll().subscribe({
      next:(data)=> res.status(200).json({status:res.statusCode,data})
    })
  }
  @Post()
  create(@Body() createCatDto: CreateCatsDto, @Res() res:Response):object{
    return  this.catsService.create(createCatDto).subscribe({
   next:(data)=>res.status(200).json({status:res.statusCode,data})
    })
  }


  @Get(':id')
  findOne(@Param() params):Array<any>{
    console.log(params.id);
    return []
}
 @Put(':id')
  update(@Param() id: string, @Body() updateCatDto: UpdateCatsDto): object{
    return {}
 }
 @Delete(':id')
  remove(@Param() id: string){
    return of(`deleted ${id} `)
 }
}
