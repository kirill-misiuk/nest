import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
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
            error: error => res.status(400).json({ status: res.statusCode, error }),
        });
    }

    @Post()
    create(@Body() createCatDto: CreateCatsDto, @Res() res: Response) {
        return this.catsService.create(createCatDto).subscribe({
            next: data => res.status(200).json({ status: res.statusCode, data }),
            error: error => res.status(400).json({ status: res.statusCode, error }),
        });
    }

    @Get(':_id')
    findOne(@Param() params, @Res() res: Response) {
        return this.catsService.findOne(params._id).subscribe({
            next: data => res.status(200).json({ status: res.statusCode, data }),
            error: error => res.status(400).json({ status: res.statusCode, error }),
        });
    }

    @Put(':_id')
    update(@Param() params, @Body() updateCatDto: UpdateCatsDto, @Res() res: Response) {
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
            return this.catsService.update(updateCatDto).subscribe({
                next: data => res.status(200).json({ status: res.statusCode, data }),
                error: error => res.status(400).json({ status: res.statusCode, error }),
            });
        }
    }

    @Delete()
    remove(@Query() query, @Res() res: Response) {
        const { _id } = query;
        return this.catsService.delete(_id).subscribe({
            next: data => res.status(200).json({ status: res.statusCode, data }),
            error: error => res.status(400).json({ status: res.statusCode, error }),
        });
    }
}
