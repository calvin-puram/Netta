<template>
  <div class="footer">
    <div class="footer__wrapper">
      <!-- socials -->
      <div class="footer__socials">
        <div class="footer__logo">
          <img :src="Logo" alt="footer logo" />
          <span class="logo-text">Netta</span>
        </div>
        <p class="footer__lead">
          Netta is a platform that connects software developers, tech
          enthusiasts with coding bootcamps in nigeria.
        </p>
        <div class="footer__socials-icons">
          <a href="!#" class="footer__link">
            <img :src="facebook" alt="facebook" />
          </a>
          <a href="!#" class="footer__link">
            <img :src="youtube" alt="youtube" />
          </a>
          <a href="!#" class="footer__link">
            <img :src="twitter" alt="twitter" />
          </a>
        </div>
      </div>

      <div class="footer__quicklinks">
        <ul class="footer__list">
          <p class="lead">Quicklinks</p>
          <li class="quick-link">
            <a href="!#" class="link">
              Home
            </a>
          </li>
          <li class="quick-link">
            <a href="!#" class="link">
              Bootcamps
            </a>
          </li>
          <li class="quick-link">
            <a href="!#" class="link">
              Communities
            </a>
          </li>
          <li class="quick-link">
            <a href="!#" class="link">
              Hubs
            </a>
          </li>
          <li class="quick-link">
            <a href="!#" class="link">
              About
            </a>
          </li>
        </ul>
      </div>

      <div class="footer__contact">
        <ul class="footer__list">
          <p class="lead">Contact Us</p>
          <li class="infomation link">(+234) 2323245</li>
          <li class="infomation link">info@netta.com</li>
          <li class="infomation link">8, Bethlehem cresent</li>
          <li class="infomation link">Oyo State, Ibadan</li>
          <li class="infomation link">Nigeria</li>
        </ul>
      </div>

      <div class="footer__terms">
        <ul class="footer__list">
          <li class="quick-link">
            <a href="!#" class="link">
              Terms and Condition
            </a>
          </li>
          <li class="quick-link">
            <a href="!#" class="link">
              FaQs
            </a>
          </li>
          <li class="quick-link">
            <a href="!#" class="link">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__copyright">
      All Right Reserved | Netta {{ new Date().getFullYear() }}
    </div>
  </div>
</template>

<script>
import Logo from '../../assets/logo.svg';
import facebook from '../../assets/facebook.svg';
import youtube from '../../assets/youtube.svg';
import twitter from '../../assets/twitter.svg';
export default {
  data() {
    return {
      Logo,
      facebook,
      youtube,
      twitter
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  background: #2c2c2c;
  height: auto;
  padding-top: 1rem;

  &__logo {
    display: flex;
    align-items: center;
    padding-bottom: 2rem;
    .logo-text {
      font-size: 26px;
      color: #d8bd9e;
      padding-left: 0.5rem;
    }
  }

  &__lead {
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    width: 60%;
    padding-bottom: 1rem;
  }

  &__wrapper {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    flex-wrap: wrap;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__socials,
  &__quicklinks,
  &__contact,
  &__terms {
    flex: 1;
  }

  &__socials {
    &-icons {
      display: flex;
      align-items: center;
      .footer__link {
        margin-right: 1rem;
      }
    }
  }

  .lead {
    font-size: 16px;
    line-height: 17px;
    color: #ffffff;
    padding-bottom: 2rem;
  }

  .quick-link {
    list-style: none;

    .link {
      text-decoration: none;
      color: #fff !important;
      font-size: 14px;
    }
  }

  .infomation {
    list-style: none;
    text-decoration: none;
    color: #fff !important;
    font-size: 14px;
    margin-bottom: 0.2rem;
  }

  &__terms {
    width: 100%;
  }

  &__copyright {
    text-align: center;
    padding: 1.5rem 0;
    background: #000;
    font-size: 12px;
    color: #fff;
    margin-bottom: 0;
  }
}

@media screen and (max-width: 768px) {
  .footer {
    padding-top: 3rem;

    &__wrapper {
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }

    &__lead {
      width: 95%;
      margin: auto;
    }

    &__logo {
      display: block;
      padding-bottom: 1rem;
      .logo-text {
        padding-top: 1rem;
      }
    }

    &__socials {
      &-icons {
        display: block;
      }
    }

    .lead {
      padding-bottom: 0;
    }

    &__socials,
    &__quicklinks,
    &__contact,
    &__terms {
      margin-bottom: 3rem;
    }
  }
}
</style>
