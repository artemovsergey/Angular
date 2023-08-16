import { Category } from "../model/Category";
import { Priority } from "../model/Priority";
import { Task } from "../model/Task";

export class TestData {


    static categories: Category[] = [
        { id: 1, title: "Работа" },
        { id: 2, title: "Работа" },
        { id: 3, title: "Работа" },
        { id: 4, title: "Работа" },
    ];

    static priorities: Priority[] = [
        { id: 1, title: "Высокий", color: "#232123" },
        { id: 2, title: "Средний", color: "#232323" },
        { id: 3, title: "Низкий", color: "#123213" },
        { id: 4, title: "Очень низкий", color: "#232123" },
    ];


    static tasks: Task[] = [
        {
            id: 1,
            title: "Купить молоко",
            completed: true,
            priority: TestData.priorities[0],
            category: TestData.categories[0],
            date: new Date("2022-01-01")
        },
    ]


}