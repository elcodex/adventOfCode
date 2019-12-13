# AoC 2019 
https://adventofcode.com/2019

Мои решения на JS. Ниже описаны только решения задач без формулировок.

**День 1.** Вычисляем значение по формуле F(mass) = (mass / 3) - 2. Во второй части 
формула становится рекурсивной FR(mass) = F(mass) + FR(F(mass)), пока аргумент больше 0.

**День 2.** Первый интерпретатор. Дана последовательность чисел: intcode.
Коды инструкции:
- `1`: сложение. (1 A B C) => intcode[C] = incode[A] + intcode[B].
- `2`: умножение. (2 A B C) => intcode[C] = intcode[A] + intcode[B].
- `99`: завершить выполнение программы.

**День 3.** Находим пересечения горизонтальных, вертикальных линий.
Лиии даны в виде двух точек ((x1, y1), (x2, y2)).
Линии пересекаются, если выполняются все условия:
- одна из них горизонтальная (x1 == x2), а другая - вертикальная (y1 === y2),
- совпадающие координаты одной линии лежат внутри интервала соответствующих координат 
другой линии.
Для решения первой части для точек пересений вычисляем манхэттенское расстояние 
до точки (0, 0). Во второй части при поиске пересечений дополнительно считаем сумму 
длин линий до точки пересечения.  

**День 4.** Перебором всех чисел в интервале, смотрим подходит ли число к заданным критериям.

**День 5.** Второй интерпретатор. Добавленные инструкции:
- `3`: записать входной параметр. (3 I) => intcode[I] = input
- `4`: считать выходной параметр. (4 U) => intcode[U]
- `5`: переход к N-ой инструкции при выполнении условия. (5 C J) => if C than pointer = J
- `6`: переход к N-ой инструкции при невыполнении условия. (6 C J) => if not C than pointer = J.
- `7`: запись определенного значения при сравнении на <. (7 A B C) => if (A < B) than С = 1 else С = 0.
- `8`: запись определенного значения при сравнении на =. (7 A B C) => if (A === B) than С = 1 else С = 0.

Аргументы в инструкции могут быть интерпретированы как по адресу (intcode[A]), так и по значению (A).
Режим задаётся в инструкции для каждого аргумента: 11001 => modes = [0,1,1] (2 - 0), opcode = 01(3 - 4).

**День 7.** Запуск интерпретора в цикле. Выводы предыдущего запуска являются входным данными для 
следующего запуска.
Во второй части учим интерпретатор прерывать выполнение, если не хватает входных параметров. Когда 
появляются новые входные параметры запускаем программу с места остановки.
Добавляем стоп коды к интерпретатору STOP_CODES. В выходных данных запоминаем кроме данных, которые 
вернул интерпретатор: причину остановки, позицию остановки, текущее состояное памяти.

**День 9.** Усовершенствуем интерпретатор. 
Новый режим для параметров инструкции relative mode, код 2. Аргумент в таком режиме передаётся по 
адресу и когда вычисляется адрес к нему добавляется параметр relative base (в начале равен 0).
Новая инструкция:
- `9` - изменяет новый параметр на величину в аргументе. (9 A) => relative base += A.

**День 11.** Используем интерпретатор для рисования.
В функции emergencyHullPaintingRobot запускаем интерпретатор с единственным входным параметром -
цветом панели, на которой стоит робот. Получаем на выходе цвет для закрашивания панели и куда пойти 
роботу дальше (влево(0) или вправо(1)). Робот переходим на следующую панель, передаёт программе цвет 
этой панели и интерпретатор продолжает выполняться дальше с позиции остановки.  

**День 13.** Программа для интерпретатора - игра [Арканоид] (https://ru.wikipedia.org/wiki/Arkanoid).
В первой части задания считаем количество кипричей в выводе программы (функция blocksNumber).
Во второй части играем в игру, двигая платформу влево и вправо(функция play). Если мяч летит вниз, то вычисляем
предполагаемую позицию платформы 
`ballPositions[1].x + Math.abs(ballPositions[1].y - paddlePosition[1].y)` - если мяч движется вправо,
`ballPositions[1].x - Math.abs(ballPositions[1].y - paddlePosition[1].y)` - если мяч движется влево.
Чтобы успевать подставлять платформу, движемся в направлении мяча, когда он летит вверх.
Каждый ход выводим в консоль доску игры, в конце выводим счёт, который вовращает программа.