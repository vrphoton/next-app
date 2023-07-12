import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MockData } from "./menu.mockDatas";
import { _ } from "lodash";

describe('MenuController', () => {

	let controller: MenuController;
	let menuService: MenuService;

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
			controllers: [MenuController],
			providers: [MenuService, MenuServiceMock],
		}).compile();

		controller = module.get<MenuController>(MenuController);
		menuService = module.get<MenuService>(MenuService);

	});

	describe("Root", () => {

		describe("General",  () => {
			it('Controller should be defined', () => {
				expect(controller).toBeDefined();
			});
		});

		describe("GET", () => {
			it("Should return all the menu", () => {
				const result = controller.findAll();
				expect(menuService.findAll).toHaveBeenCalled();
				expect(result).toEqual(MockData);
				expect(result).toHaveLength(2);
				expect(Array.isArray(result)).toBe(true)
			});	
			it("Should return the menu by menu ID if its exist in db", () => {
				const result = controller.findOne(MockData[0]['_id']);
				expect(menuService.findOne).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
				expect(result && typeof result == "object").toBe(true);
			});	
		});

		describe("POST", () => {
			it("Should create the menu", () => {
				const result = controller.create(_.omit(MockData[0], '_id'));
				expect(menuService.create).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
			});
		});

		describe("PATCH", () => {
			it("Should update the menu", () => {
				const result = controller.update(MockData[0]['_id'], {price : 200.0, _id: MockData[0]['_id']});
				expect(menuService.update).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
			});		
		});

		describe("DELETE", () => {
			it("Should delete the menu", () => {
				const result = controller.remove(MockData[0]['_id']);
				expect(menuService.remove).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
				expect(result['_id']).toEqual(MockData[0]["_id"]);
			});		
		});
	});

});
