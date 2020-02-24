import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { of } from 'rxjs';
import { Response } from 'express';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    findAll(@Res() res: Response) {
        return this.catsService.findAll().subscribe({
            next: data => res.status(200).json({ status: res.statusCode, data }),
        });
    }

    @Post()
    create(@Body() createCatDto: CreateCatsDto, @Res() res: Response): object {
        return this.catsService.create(createCatDto).subscribe({
            next: data => res.status(200).json({ status: res.statusCode, data }),
        });
    }

    @Get(':_id')
    findOne(@Param() params): Array<any> {
        console.log(params._id);
        return [];
    }

    @Put(':_id')
    update(@Param() params, @Body() updateCatDto: UpdateCatsDto): object {
        const { _id } = params;
        if (_id !== updateCatDto._id) {
            throw new HttpException(
                {
                    status: HttpStatus.CONFLICT,
                    error: `${_id} in params and ${updateCatDto._id} not same!`,
                },
                403,
            );
        } else {
            return this.catsService.update(updateCatDto);
        }
    }

    @Delete(':id')
    remove(@Param() id: string) {
        return of(`deleted ${id} `);
    }
}
