import React from 'react'

const About = () => {
  return (
    <>
      <section>
        <header>
          <h2>About</h2>
        </header>
        <p>
          This is an online inventory and equipment tool compatible with the
          LotFP TTRPG system. It allows tracking of encumbrance and movement
          speed.
        </p>
        <p>
          I created the Princess Helper to provide a convenient way to play from
          a phone or computer, quickly create inventory, and calculate
          encumbrance and movement speed. The inventory can be shared, it is
          saved between page refreshes, and there is an export and import
          feature.
        </p>
        <details className='mb-4'>
          <summary>Features list</summary>
          <ul>
            <li>
              Lists of equipment including armor, weapons, miscellaneous items,
              and some tips about these items.
            </li>
            <li>
              Calculation
              <ul>
                <li>Encumbrance</li>
                <li>Movement</li>
                <li>Terrain and weather adjustments</li>
              </ul>
            </li>
            <li>Custom equipment entries</li>
            <li>
              Inventory is saved in locale storage and survives the page reload
              <ul>
                <li>State can be exported and imported</li>
              </ul>
            </li>
            <li>Languages support</li>
            <li>Responsive layout, mobile devices support</li>
            <li>
              Equipment sets
              <ul>
                <li>By class</li>
                <li>Common</li>
                <li>Random</li>
              </ul>
            </li>
          </ul>
        </details>
        <p>
          The full list of features is available on the{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/8kto/ttrpg-lotfp-helpers?tab=readme-ov-file#features-list'
          >
            project page
          </a>
          . Currently, it does not include mounts, animals, or firearms. I plan
          to revisit this after a [short] break.
        </p>
      </section>
      <section>
        <header>
          <h2>Sources</h2>
        </header>
        <p>
          I used the{' '}
          <a
            href='https://preview.drivethrurpg.com/en/product/115059/LotFP-Rules--Magic-Free-Version'
            target='_blank'
            rel='noopener noreferrer'
          >
            LotFP Rules & Magic Free Version
          </a>{' '}
          rulebook and resources from{' '}
          <a
            href='https://www.basicfantasy.org/downloads.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Basic Fantasy RPG
          </a>
          , specifically the Equipment Emporium (r24) for the details on
          Miscellaneous Equipment.
        </p>
        <p>
          I also expanded the Weapons list, adding specific items for Great,
          Medium, Small, and Minor weapons to enhance clarity.
        </p>
      </section>
      <section>
        <header>
          <h2>Contacts</h2>
        </header>
        <p>
          I&apos;d love to hear that you&apos;re using the app in your games.
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
            My website:{' '}
            <a
              href='https://ivlev.blog/'
              target='_blank'
              rel='noopener noreferrer'
            >
              ivlev.blog
            </a>
          </li>
          <li>
            <a href='https://t.me/oktottrpg'>What Does Oktopus Say</a> in
            Telegram.
          </li>
        </ul>
        <p>
          For feedback, bug reports, feature requests, typos in translations
          (some are machine-translated), or other comments, visit{' '}
          <a
            href='https://github.com/8kto/ttrpg-lotfp-helpers'
            target='_blank'
            rel='noopener noreferrer'
          >
            Princess Helpers on GitHub
          </a>
          . <br />
          You may <strong>suggest translation</strong> at the same page. If you
          find GitHub challenging but have enthusiasm, write to me on Telegram.
        </p>
        <p>
          If you enjoy the tool, feel free to share it, star it on GitHub, hack
          it,{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.buymeacoffee.com/8kto'
          >
            buy me a coffee
          </a>{' '}
          (I will spend that money on role-playing games; your name would be
          added to the contributors list).
        </p>
      </section>
    </>
  )
}

export default About
