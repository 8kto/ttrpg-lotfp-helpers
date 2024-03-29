import React from 'react'

import { PROJECT_URL } from '@/config/AppMetadata'

const About = () => {
  return (
    <>
      <section>
        <header>
          <h2>О проекте</h2>
        </header>
        <p>
          Учёт инвентаря и снаряжения, нагрузки и скорости, совместимый с
          НРИ-системой LotFP.
        </p>
        <p>
          Я написал Princess Helpers, чтобы был удобный способ играть с телефона
          или компьютера, быстро создавать инвентарь и рассчитывать нагрузку и
          скорость передвижения. Инвентарь можно расшарить, он сохраняется между
          обновлениями страницы, есть функция экспорта и импорта.
        </p>
        <details className='mb-4'>
          <summary>Список функций</summary>
          <ul>
            <li>
              Списки снаряжения, включая броню, оружие, различные предметы, а
              также некоторые детали этих предметов.
            </li>
            <li>
              Подсчёт
              <ul>
                <li>Нагрузка</li>
                <li>Передвижение</li>
                <li>Корректировки для местности и погоды</li>
              </ul>
            </li>
            <li>Кастомные предметы для инвентаря</li>
            <li>
              Инвентарь сохраняется в локальном хранилище браузера и сохраняется
              при перезагрузке страницы
              <ul>
                <li>Экспорт и импорт</li>
              </ul>
            </li>
            <li>Поддержка языков</li>
            <li>Адаптивный дизайн, поддержка мобильных устройств</li>
            <li>
              Наборы снаряжения
              <ul>
                <li>По классу</li>
                <li>Общие</li>
                <li>Случайные</li>
              </ul>
            </li>
          </ul>
        </details>
        <p>
          Полный список функций доступен на{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`${PROJECT_URL}?tab=readme-ov-file#features-list`}
          >
            странице проекта
          </a>
          . Сейчас нет поддержки вьючных животных и езды верхом, а также
          огнестрельного оружия. Я планирую вернуться к этому после некоторого
          перерыва.
        </p>
      </section>
      <section>
        <header>
          <h2>Источники</h2>
        </header>
        <p>
          Я использовал{' '}
          <a
            href='https://preview.drivethrurpg.com/en/product/115059/LotFP-Rules--Magic-Free-Version'
            target='_blank'
            rel='noopener noreferrer'
          >
            LotFP Rules & Magic Free Version
          </a>{' '}
          и ресурсы из{' '}
          <a
            href='https://www.basicfantasy.org/downloads.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Basic Fantasy RPG
          </a>
          , в частности, Equipment Emporium (r24) для подсказок для разного
          снаряжения.
        </p>
        <p>
          Я также расширил список оружия, добавив конкретные экземпляры для
          Большого, Среднего, Малого и Незначительного оружия (Great, Medium,
          Small, Minor) для большей наглядности.
        </p>
      </section>
      <section>
        <header>
          <h2>Контакты</h2>
        </header>
        <p>
          Дайте знать, если вы используете приложение в своих играх, я буду рад
          услышать обратную связь.
        </p>
        <ul>
          <li>
            <a
              href='https://quoteque.itch.io/princess-helpers'
              target='_blank'
              rel='noopener noreferrer'
            >
              quoteque.itch.io/princess-helpers
            </a>
          </li>
          <li>
            Мой сайт:{' '}
            <a
              href='https://ivlev.blog/'
              target='_blank'
              rel='noopener noreferrer'
            >
              ivlev.blog
            </a>
          </li>
          <li>
            <a href='https://t.me/oktottrpg'>What does Oktopus say</a> в
            Telegram.
          </li>
        </ul>
        <p>
          Для обратной связи, сообщений об ошибках, запросов, опечаток в
          переводах (некоторый перевод — машинный, я мог что-то пропустить) или
          других комментариев:{' '}
          <a href={PROJECT_URL} target='_blank' rel='noopener noreferrer'>
            Princess Helpers на GitHub
          </a>
          . <br />
          Вы можете <strong>предложить перевод</strong> на той же странице. Если
          тяжело с GitHub, но есть энтузиазм, напишите в Телеграме.
        </p>
        <p>
          Если вам нравится проект, поделитесь им, поставьте звезду на GitHub,
          хакните его,{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.buymeacoffee.com/8kto'
          >
            купите мне кофе
          </a>{' '}
          (я потрачу эти деньги на настольные ролевые игры; ваше имя будет
          добавлено в почётный список где-нибудь здесь).
        </p>
      </section>
    </>
  )
}

export default About
