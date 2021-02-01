<template>
  <div class="home__connect">
    <div class="home__connect-wrapper">
      <div class="home__connect-hubs">
        <h2 class="connect-header">
          Let’s Build Something
          <span class="join-1"> Great Together</span>
        </h2>
        <p class="connect-para">
          Netta provides up to date list of all coding bootcamps in Nigeria
          where developers can connect and build amazing products.
        </p>
      </div>

      <img :src="heroBg" alt="hero illustration" class="hero__img" />
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
.home__connect {
  background: url('../../assets/home_foot_bg.svg') no-repeat center center;
  background-size: cover;
  height: 70vh;
  &-wrapper {
    margin: 1rem 0;
    margin-left: 7rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .home__connect-hubs {
    flex: 1;
  }
  .hero__img {
    flex: 1;
    width: 100%;
  }

  .connect-header {
    padding-bottom: 1rem;
    color: #161f42;
    font-size: 30px;
    font-weight: 900;
    line-height: 128.34%;
  }

  .join-1 {
    display: block;
  }

  .connect-para {
    font-size: 17px;
    line-height: 175.78%;
    color: #5c5c5c;
    padding-bottom: 2rem;
    width: 80%;
  }
}

@media screen and (max-width: 1024px) {
  .home__connect {
    height: auto;
    padding: 6rem 0;

    .connect-header {
      font-size: 20px;
    }

    .connect-para {
      line-height: 155.78%;
    }
  }
}
@media screen and (max-width: 600px) {
  .home__connect {
    text-align: center;
    &-wrapper {
      margin-left: 0;
      flex-direction: column;
      justify-content: center;
    }
    .connect-header {
      padding-bottom: 0.5rem;
    }

    .connect-para {
      width: 100%;
      padding-bottom: 0.5rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    &-communities,
    &-hubs,
    &-bootcamps {
      margin-top: 3rem;
    }
  }
}
</style>
