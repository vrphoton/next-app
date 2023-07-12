import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './models/menu.model';
import { Model } from 'mongoose';
import { IUpdateMenu, IMenu } from './menu.interface';
import { CreateMenuDTO } from './dto/create-menu.dto';

export class MenuRepository {

    constructor(
        @InjectModel(Menu.name) private readonly menuModel: Model<IMenu>,
    ) {}

    async createMenu(createMenuDto: CreateMenuDTO):Promise<IMenu> {
        try {
            const menu = new this.menuModel(createMenuDto);
            return await menu.save();
        } catch (e) {
            return checkAndSendErrors(e);
        }
    }

    async findMenu():Promise<IMenu[]> {
        try {
            return await this.menuModel.find();           
        } catch (e) {
            return checkAndSendErrors(e);
        }    
    }

    async findMenuById(id: string) {
        try {
            return await this.menuModel.findById({_id:id}).exec();           
        } catch (e) {
            return checkAndSendErrors(e);
        }     
    }

    async updateMenu(id: string, updateMenuDto: IUpdateMenu) {
        try {
            return await this.menuModel.findByIdAndUpdate({_id : id}, {...updateMenuDto, _id: id});    
        } catch (e) {
            return checkAndSendErrors(e);
        }     
    }

    async removeMenu(id: string) {
        try {
            return await this.menuModel.findByIdAndRemove({_id : id});    
        } catch (e) {
            return checkAndSendErrors(e);
        }      
    }
}

function checkAndSendErrors(error:any) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
        let errors = {};
         Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        return errors;
    } else {
        return error;
    }
}