import React from 'react'

const EncumbranceReference = () => {
  return (
    <>
      <section>
        <header>
          <h2>Краткая справка по нагрузке</h2>
        </header>
        <h3>Что учитывается</h3>
        <ul>
          <li>
            <strong>Доспехи</strong>: Кольчуга и латные доспехи увеличивают
            нагрузку, но не включаются в список снаряжения.
          </li>
          <li>
            <strong>Предметы</strong>: дополнительное очко нагрузки за каждые 5
            предметов сверх начальных 6. <strong>Оружие</strong> учитывается
            также.
          </li>
          <li>
            <strong>Габаритные предметы</strong>: Большое и двуручное оружие, а
            также любой предмет, требующий для использования двух рук или равный
            росту персонажа, считаются крупногабаритными и увеличивают нагрузку.
          </li>
          <li>
            <strong>Монеты</strong>: 100 любых монет считаются за 1 обычный
            предмет.
          </li>
          <li>
            Мелкие предметы одного типа (например, стрелы, колышки) считаются за
            один предмет.
          </li>
        </ul>

        <h3>Что не учитывается</h3>
        <ul>
          <li>Носимые предметы, такие как плащи, украшения и рюкзаки.</li>
          <li>Очень мелкие предметы, по усмотрению Рефери.</li>
        </ul>

        <h3>Как считать</h3>
        <ul>
          <li>
            <strong>Кольчуга или Латные Доспехи</strong>: +1 или +2 очка
            соответственно.
          </li>
          <li>
            <strong>Предметы</strong>: +1 очко за каждые 5 предметов сверх
            первых 5. Гномы могут нести дополнительные 5 предметов (всего 10)
            прежде, чем применяются штрафы за нагрузку.
          </li>
          <li>
            <strong>Габаритные предметы</strong>: +1 очко за каждый.
          </li>
        </ul>

        <details className='mb-4'>
          <summary>Показать таблицы нагрузки и скорости передвижения</summary>
          <div className='mb-4 overflow-x-auto'>
            <table>
              <thead>
                <tr>
                  <th>Очки</th>
                  <th>Нагрузка</th>
                  <th>Исследование</th>
                  <th>Бой</th>
                  <th>Бег</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0–1</td>
                  <td>Ненагружен</td>
                  <td>120&apos;</td>
                  <td>40&apos;</td>
                  <td>120&apos;</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Легко нагружен</td>
                  <td>90&apos;</td>
                  <td>30&apos;</td>
                  <td>90&apos;</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Сильно нагружен</td>
                  <td>60&apos;</td>
                  <td>20&apos;</td>
                  <td>60&apos;</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Тяжело нагружен</td>
                  <td>30&apos;</td>
                  <td>10&apos;</td>
                  <td>30&apos;</td>
                </tr>
                <tr>
                  <td>5+</td>
                  <td>Перегружен</td>
                  <td>0&apos;</td>
                  <td>0&apos;</td>
                  <td>0&apos;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>Тип местности влияет на скорость:</p>
          <div className='mb-4 overflow-x-auto'>
            <table>
              <thead>
                <tr>
                  <th>Местность</th>
                  <th>Корректировка</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Горы, джунгли, болото</td>
                  <td>×⅓</td>
                </tr>
                <tr>
                  <td>Леса, пустыни, холмы</td>
                  <td>×½</td>
                </tr>
                <tr>
                  <td>Равнины, тропы</td>
                  <td>×⅔</td>
                </tr>
                <tr>
                  <td>Дорога</td>
                  <td>×1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>Плохая погода также влияет на передвижение:</p>
          <div className='mb-4 overflow-x-auto'>
            <table>
              <thead>
                <tr>
                  <th>Условия</th>
                  <th>Корректировка</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Осадки, сильный ветер</td>
                  <td>×½</td>
                </tr>
                <tr>
                  <td>Буря</td>
                  <td>×⅓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>

        <h3>Эффекты</h3>
        <ul>
          <li>
            <strong>Специалисты</strong> должны быть без нагрузки, чтобы
            использовать любые способности класса, связанные с передвижением без
            штрафов, или получить штраф к проверке: -1 за каждый уровень
            нагрузки.
          </li>
          <li>
            <strong>Маги</strong> не могут использовать заклинания, если они
            более чем Легко нагружены. <strong>Эльфы</strong> не могут
            использовать заклинания, если они более чем Сильно нагружены.
          </li>
        </ul>
      </section>

      <section>
        <header>
          <h2>In app</h2>
        </header>
        <p>Encumbrance Units and Points:</p>
        <ul>
          <li>
            <strong>Encumbrance Points</strong>: These are used to determine the
            encumbrance level of a character. Taken from the core book.
          </li>
          <li>
            <strong>Encumbrance Units</strong>: Smaller divisions of encumbrance
            points, with 1 encumbrance unit being 1/5 of a point. All elements
            in the system have a weight expressed in e.u.
          </li>
        </ul>

        <p>Special Rules:</p>
        <ul>
          <li>
            <strong>Coins Encumbrance</strong>: 100 coins count as 1 regular
            item or 1 e.u. This option can be disabled in the Wallet settings.
          </li>
        </ul>
      </section>
    </>
  )
}

export default EncumbranceReference
