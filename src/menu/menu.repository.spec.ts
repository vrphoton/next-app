import { Model } from 'mongoose';
import { MenuRepository } from './menu.repository';
import { IMenu } from './menu.interface';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Menu } from './models/menu.model';
import { MockData } from "./menu.mockDatas";
import { _ } from "lodash";

describe('MenuRepository', () => {
	let menuRepository: MenuRepository;
	let productModel: Model<IMenu>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MenuRepository,
				{
					provide: getModelToken('Menu'),
					useValue: Menu,
				},
			],
		}).compile();

		menuRepository = module.get<MenuRepository>(MenuRepository);
	});

	describe("Root", () => {

		describe("General", () => {
			it('Repository should be defined', () => {
				expect(menuRepository).toBeDefined();
			});
		});

		describe("GET", () => {
			it('should return all the menu', async () => {
				jest
					.spyOn(menuRepository, 'findMenu')
					.mockResolvedValueOnce(MockData);
				const menu = await menuRepository.findMenu();
				expect(menu).toBeDefined();
				expect(menuRepository.findMenu).toHaveBeenCalled();
				expect(Array.isArray(menu)).toBe(true);
				menu.forEach((menuItem) => {
					expect(typeof menuItem._id == "string").toBe(true);
					expect(typeof menuItem.name == "string").toBe(true);
					expect(typeof menuItem.price == "number").toBe(true);
					expect(typeof menuItem.category == "string").toBe(true);
					expect(typeof menuItem.description == "string").toBe(true);
					expect(typeof menuItem.isAvailable == "boolean").toBe(true);
				});	
			});
			it('should return the menu with the given ID', async () => {
				const menuId 	= MockData[0]["_id"];
				const mockData 	= MockData[0];
				jest
					.spyOn(menuRepository, 'findMenuById')
					.mockResolvedValueOnce(mockData);
				const menu = await menuRepository.findMenuById(menuId);
				expect(menu).toBeDefined();
				expect(menuRepository.findMenuById).toHaveBeenCalled();
				expect(menu._id).toBe(menuId);
				expect(menu.name).toBe(mockData.name);
				expect(menu.price).toBe(mockData.price);
				expect(menu.category).toBe(mockData.category);
				expect(menu.description).toBe(mockData.description);
				expect(menu.isAvailable).toBe(mockData.isAvailable);
			});
		});

		describe("POST", () => {
			it('should create the menu', async () => {
				jest
					.spyOn(menuRepository, 'createMenu')
					.mockResolvedValueOnce(MockData[0]);
				const menu = await menuRepository.createMenu(_.omit(MockData[0], "_id"));
				expect(menu).toBeDefined();
				expect(menuRepository.createMenu).toHaveBeenCalled();
				expect(typeof menu == "object").toBe(true);
				expect(typeof menu._id == "string").toBe(true);
				expect(typeof menu.name == "string").toBe(true);
				expect(typeof menu.price == "number").toBe(true);
				expect(typeof menu.category == "string").toBe(true);
				expect(typeof menu.description == "string").toBe(true);
				expect(typeof menu.isAvailable == "boolean").toBe(true);
			});
		});
		describe("PATCH", () => {
			it('should update the menu', async () => {
				jest
					.spyOn(menuRepository, 'updateMenu')
					.mockResolvedValueOnce(MockData[0]);
				const menu = await menuRepository.updateMenu(MockData[0]['_id'], _.omit(MockData[0], "_id"));
				expect(menu).toBeDefined();
				expect(menuRepository.updateMenu).toHaveBeenCalled();
				expect(typeof menu == "object").toBe(true);
				expect(typeof menu._id == "string").toBe(true);
				expect(typeof menu.name == "string").toBe(true);
				expect(typeof menu.price == "number").toBe(true);
				expect(typeof menu.category == "string").toBe(true);
				expect(typeof menu.description == "string").toBe(true);
				expect(typeof menu.isAvailable == "boolean").toBe(true);
			});
		});
		describe("DELETE", () => {
			it('should delete the menu', async () => {
				jest
					.spyOn(menuRepository, 'removeMenu')
					.mockResolvedValueOnce(MockData[0]);
				const menu = await menuRepository.removeMenu(MockData[0]['_id']);
				expect(menu).toBeDefined();
				expect(menuRepository.removeMenu).toHaveBeenCalled();
			});
		});
	});


});
