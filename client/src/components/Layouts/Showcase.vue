<template>
  <div class="hero__wrapper">
    <div class="hero">
      <div class="hero__content">
        <h1 class="hero__content-header">
          Find a Code Bootcamp
        </h1>

        <p class="hero__content-lead">
          We connect software developers, tech enthusiasts with coding bootcamps
          at every step of their journey.
        </p>

        <router-link class="hero__btn" :to="{ name: 'bootcamps' }"
          >Explore Bootcamps</router-link
        >
      </div>

      <img :src="heroBg" alt="hero bg" class="hero__img" />
    </div>
  </div>
</template>

<script>
import heroBg from '../../assets/herobg.svg';
export default {
  data() {
    return {
      heroBg
    };
  }
};
</script>

<style lang="scss" scoped>
.hero__wrapper {
  background: url('../../assets/hero.svg') no-repeat center center/cover;
  height: 100vh;
}
.hero {
  width: 90%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 90%;

  &__content {
    flex: 1;

    &-header {
      color: #ffffff;
      padding-bottom: 1rem;
    }

    &-secondary {
      display: block;
    }

    &-lead {
      padding-bottom: 2.5rem;
      font-size: 1.7rem;
      line-height: 2.7rem;
      color: #afb6d3;
      width: 30rem;
    }
  }

  &__btn {
    background: #e7c7a0;
    font-size: 18px;
    line-height: 21px;
    font-weight: 900;
    color: #191f40;
    padding: 1.5rem 2rem;
    border: 1px solid #e7c7a0;
    border-radius: 1rem;
    transition: all 0.5s ease-in;

    &:hover {
      background: #f0bd7c;
      color: #191f40;
      border-color: #f0bd7c;
    }
  }

  &__img {
    flex: 1;
    width: 100%;
  }
}

@media screen and (max-width: 1024px) {
  .hero {
    height: 100vh;
    &__content {
      &-lead {
        width: 80%;
      }
    }
  }
}

@media screen and (max-width: 764px) {
  .hero {
    text-align: center;
    height: 100vh;
    &__content {
      &-lead {
        width: 80%;
        margin: auto;
        margin-bottom: 2.5rem;
      }
    }
    &__btn {
      margin-top: 1rem;
    }
  }
}

@media screen and (max-width: 500px) {
  .hero {
    height: 80vh;
    width: 100%;
    padding: 1rem 1rem;
    &__content {
      &-header {
        font-size: 2.5rem;
        line-height: 1.5;
      }
      &-lead {
        width: 100%;
      }
    }
    &__img {
      display: none;
    }
  }
}

@media screen and (max-width: 500px) {
  .hero {
    height: 95vh;
  }
}
</style>
