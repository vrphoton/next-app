import { Test, TestingModule } from '@nestjs/testing';
import { MenuResolver } from './menu.resolver';
import { MenuService } from '../menu.service';
import { IMenu } from "../menu.interface";
import { MockData } from "../menu.mockDatas";
import { _ } from "lodash";
import { CreateMenuDTO } from '../dto/create-menu.dto';
import { UpdateMenuDTO } from '../dto/update-menu.dto';

describe('MenuResolver', () => {
	let resolver 	: MenuResolver;
	let menuService : MenuService;

	beforeEach(async () => {
		const MenuServiceMock = {
			provide: MenuService,
			useFactory: () => ({
				create: jest.fn(() => MockData[0]),
				findAll: jest.fn(() => MockData),
				findOne: jest.fn(() => MockData[0]),
				update: jest.fn(() => MockData[0]),
				remove: jest.fn(() => MockData[0])
			})
		};
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MenuResolver,
				MenuService,
				MenuServiceMock,
			],
		}).compile();
		menuService = module.get<MenuService>(MenuService);
		resolver  	= module.get<MenuResolver>(MenuResolver);
	});

	describe("Root", () => {

		describe("General", () => {
			it('Resolver should be defined', () => {
				expect(resolver).toBeDefined();
			});
		});

		describe("GET", () => {
			it("Should return all the menu", async () => {
				const result:IMenu[] = await resolver.getAll();
				expect(menuService.findAll).toHaveBeenCalled();
				expect(result).toEqual(MockData);
				expect(result).toHaveLength(2);
				expect(Array.isArray(result)).toBe(true)
			});	
			it("Should return the menu by menu ID", async () => {
				const result: IMenu = await resolver.getMenu(MockData[0]['_id']);
				expect(menuService.findOne).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
				expect(result && typeof result == "object").toBe(true);
			});	
		});

		describe("POST", () => {
			it("Should create the menu", async () => {
				const result:IMenu = await resolver.createMenu(_.omit(MockData[0], '_id') as CreateMenuDTO);
				expect(menuService.create).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
			});		
		});

		describe("PATCH", () => {
			it("Should update the menu", async () => {
				const result:IMenu = await resolver.updateMenu(MockData[0]['_id'], {price : 200.0, _id: MockData[0]['_id']} as UpdateMenuDTO);
				expect(menuService.update).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
			});		
		});

		describe("DELETE", () => {
			it("Should delete the menu", async () => {
				const result:IMenu = await resolver.deleteMenu(MockData[0]['_id']);
				expect(menuService.remove).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
				expect(result['_id']).toEqual(MockData[0]["_id"]);
			});		
		});

	});


});