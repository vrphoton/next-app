import { Test, TestingModule } from '@nestjs/testing';
import { Provider } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { MenuService } from './menu.service';
import { MockData } from "./menu.mockDatas";
import { CreateMenuDTO } from "./dto/create-menu.dto";
import { UpdateMenuDTO } from "./dto/update-menu.dto";
import { _ } from "lodash";
import { IMenu } from './menu.interface';

describe('MenuService', () => {

	let service: MenuService;
	let menuRepository: MenuRepository;

	beforeEach(async () => {

		const MenuRepositoryMock = {
			provide: MenuRepository,
			useFactory: () => ({
				createMenu: jest.fn(() => MockData[0]),
				findMenu: jest.fn(() => MockData),
				findMenuById: jest.fn(() => MockData[0]),
				updateMenu: jest.fn(() => MockData[0]),
				removeMenu: jest.fn(() => MockData[0])
			})
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [MenuService],
			providers: [MenuRepository, MenuRepositoryMock],
		}).compile();

		service = module.get<MenuService>(MenuService);
		menuRepository = module.get<MenuRepository>(MenuRepository);

	});

	describe("Root", () => {

		describe("General",  () => {
			it('Service should be defined', () => {
				expect(service).toBeDefined();
			});
		});

		describe("GET", () => {
			it("Should return all the menu", async () => {
				const result:IMenu[] = await service.findAll();
				expect(menuRepository.findMenu).toHaveBeenCalled();
				expect(result).toEqual(MockData);
				expect(result).toHaveLength(2);
				expect(Array.isArray(result)).toBe(true)
			});	
			it("Should return the menu by menu ID", async () => {
				const result: IMenu = await service.findOne(MockData[0]['_id']);
				expect(menuRepository.findMenuById).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
				expect(result && typeof result == "object").toBe(true);
			});	
		});

		describe("POST", () => {
			it("Should create the menu", async () => {
				const result:IMenu = await service.create(_.omit(MockData[0], '_id') as CreateMenuDTO);
				expect(menuRepository.createMenu).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
			});		
		});

		describe("PATCH", () => {
			it("Should update the menu", async () => {
				const result:IMenu = await service.update(MockData[0]['_id'], {price : 200.0, _id: MockData[0]['_id']} as UpdateMenuDTO);
				expect(menuRepository.updateMenu).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
			});		
		});

		describe("DELETE", () => {
			it("Should delete the menu", async () => {
				const result:IMenu = await service.remove(MockData[0]['_id']);
				expect(menuRepository.removeMenu).toHaveBeenCalled();
				expect(result).toEqual(MockData[0]);
				expect(result['_id']).toEqual(MockData[0]["_id"]);
			});		
		});
	});

});
