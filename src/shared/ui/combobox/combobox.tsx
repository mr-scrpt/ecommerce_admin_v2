// "use client";
//
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { cn } from "../utils";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "../command";
// import { Popover, PopoverContent, PopoverTrigger } from "../popover";
// import { FormControl } from "../form";
// import { Button } from "../button";
// const list = [
//   {
//     value: "1692286e-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №1: Київське шосе, 27",
//   },
//   {
//     value: "7b422fc4-e1b8-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №2 (до 200 кг): вул. Базова, 16 (Промринок, 7 км)",
//   },
//   {
//     value: "169227dc-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №3: вул. Дальницька, 23/4",
//   },
//   {
//     value: "1ec09d63-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Мобільне відділення №4 (до 30 кг): вул. Євгена Чикаленка, 86",
//   },
//   {
//     value: "40498333-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label:
//       "Відділення №5 (до 30 кг на одне місце): вул. Академіка Філатова, 24",
//   },
//   {
//     value: "4049833b-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №7 (до 30 кг на одне місце): вул. Жуковського, 10",
//   },
//   {
//     value: "fec179c6-1d90-11e6-971e-005056887b8d",
//     type: "Branch",
//     label: "Відділення №8: вул. Генерала Цветаєва, 3/5",
//   },
//   {
//     value: "16922801-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №9 (до 30 кг на одне місце): вул. Сегедська, 18",
//   },
//   {
//     value: "16922802-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label:
//       "Відділення №10 (до 30 кг на одне місце): вул. Владислава Бувалкіна, 28",
//   },
//   {
//     value: "2bb8cee4-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №11: вул. Миколаївська дорога, 235",
//   },
//   {
//     value: "511fcff4-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №13 (до 30 кг на одне місце): вул. Семена Палія, 99Б",
//   },
//   {
//     value: "511fcff5-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №14 (до 10 кг): вул. Маршала Малиновського, 71",
//   },
//   {
//     value: "511fcff6-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №15: Тираспольське шосе, 2",
//   },
//   {
//     value: "5a39e54d-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label:
//       'Відділення №16 (до 30 кг на одне місце): вул. Малиновського, 27а (маг. "Копійка")',
//   },
//   {
//     value: "1ec09d47-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №17 (до 30 кг): вул. Розумовська, 29",
//   },
//   {
//     value: "1ec09d48-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №18 (до 30 кг): вул. Фонтанська дорога, 16/8",
//   },
//   {
//     value: "1ec09d98-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №19 (до 30 кг): вул. Радісна, 9",
//   },
//   {
//     value: "1ec09d99-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №20 (до 30 кг на одне місце): вул. Мала Арнаутська, 119",
//   },
//   {
//     value: "5a39e58e-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label:
//       "Відділення №21 (до 30 кг на одне місце): просп. Українських Героїв, 21",
//   },
//   {
//     value: "5a39e58f-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №22 (до 30 кг на одне місце): вул. Єврейська, 1",
//   },
//   {
//     value: "5a39e590-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label:
//       "Відділення №23 (до 30 кг): с. Крижанівка, вул. Сахарова Академіка 3к",
//   },
//   {
//     value: "5a39e591-e1c2-11e3-8c4a-0050568002cf",
//     type: "Branch",
//     label: "Відділення №24 (до 30 кг): вул. Фонтанська дорога, 4а",
//   },
//   {
//     value: "38e248b2-7246-11ed-9eb1-d4f5ef0df2b8",
//     type: "Postomat",
//     label:
//       'Поштомат "Нова Пошта" №35921: вул. Єврейська, 1, біля відділення №22',
//   },
//   {
//     value: "7a31bd00-bdc4-11ed-9eb1-d4f5ef0df2b8",
//     type: "Postomat",
//     label:
//       'Поштомат "Нова Пошта" №36227: просп. Шевченко, 23 (Магазин ГУРМАНЬ, на фасаді магазину)',
//   },
//   {
//     value: "7a35f715-bdc4-11ed-9eb1-d4f5ef0df2b8",
//     type: "Postomat",
//     label:
//       'Поштомат "Нова Пошта" №36229: вул. Сергія Ядова, 24, корп. А, біля відділення №127',
//   },
//   {
//     value: "f274494b-bf4f-11ed-9eb1-d4f5ef0df2b8",
//     type: "Postomat",
//     label: 'Поштомат "Нова Пошта" №36255: вул. Промислова, 37а (маг. МОНЕТКА)',
//   },
//   {
//     value: "f5ea9fbc-c198-11ed-9eb1-d4f5ef0df2b8",
//     type: "Postomat",
//     label: 'Поштомат "Нова Пошта" №36281: вул. Генерала Петрова, 30 (АТБ)',
//   },
//   {
//     value: "7723f329-e1e4-11ee-98f8-d4f5ef0df2b9",
//     type: "Postomat",
//     label:
//       'Поштомат "Нова Пошта" №46824: вул. Паустовського, 23 (Біля будинку, на фасаді)',
//   },
//   {
//     value: "70329000-e2ba-11ee-98f8-d4f5ef0df2b9",
//     type: "Postomat",
//     label: 'Поштомат "Нова Пошта" №46825: вул. Головна, 14 (Біля магазину)',
//   },
//   {
//     value: "0338c5c4-e52a-11ee-98f8-d4f5ef0df2b9",
//     type: "Postomat",
//     label:
//       'Поштомат "Нова Пошта" №46827: вул. Добровольського, 92 (на фасаді дому, біля 6го під\'їзду)',
//   },
//   {
//     value: "708e173c-fb21-11ee-98f8-d4f5ef0df2b9",
//     type: "DropOff",
//     label: "Пункт №50349 (до 10 кг): вул. Дерибасівська, 18 (маг.«Blisk»)",
//   },
// ];
//
// interface ListItem {
//   value: string;
//   [key: string]: any;
// }
//
// export const ComboboxForm = ({
//   itemList,
//   value,
// }: {
//   itemList: ListItem[];
//   value: string;
// }) => {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <FormControl>
//           <Button
//             variant="outline"
//             role="combobox"
//             className={cn(
//               "w-[200px] justify-between",
//               !value && "text-muted-foreground",
//             )}
//           >
//             {value
//               ? itemList.find((language) => language.value === value)?.label
//               : "Select language"}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </FormControl>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Search language..." />
//           <CommandEmpty>No language found.</CommandEmpty>
//           <CommandGroup>
//             {itemList.map((language) => (
//               <CommandItem
//                 value={language.label}
//                 key={language.value}
//                 onSelect={() => {
//                   form.setValue("language", language.value);
//                 }}
//               >
//                 <Check
//                   className={cn(
//                     "mr-2 h-4 w-4",
//                     language.value === field.value
//                       ? "opacity-100"
//                       : "opacity-0",
//                   )}
//                 />
//                 {language.label}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };
