<template>
  <div class="home__about">
    <img :src="aboutImg" alt="about " class="about__img" />
    <div class="home__about-content">
      <h2 class="about__header">
        Locate A Bootcamp, <span class="join-1">Rate A Bootcamp, </span>
        <span class="join-2">Build Awesome Products</span>
      </h2>
      <p class="about__para">
        Netta is a platform that connects software developers, tech enthusiasts
        with coding bootcamps in Nigeria.
      </p>
      <router-link to="/bootcamps" class="btn">Discover</router-link>
    </div>
  </div>
</template>

<script>
import aboutImg from '../../assets/about_image.svg';
export default {
  data() {
    return {
      aboutImg
    };
  }
};
</script>

<style lang="scss" scoped>
.home__about {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  .btn {
    box-shadow: 0px 12px 35px rgba(160, 121, 0, 0.2);
    background: linear-gradient(253.58deg, #161f42 1.55%, #161f44 95.8%);
    padding: 1.4rem 2.5rem;
    font-weight: bold;
    border-radius: 10px;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff !important;
    border: 1px solid #e7c7a0;
  }

  .about__img {
    flex: 2;
    height: 100%;
    max-width: 100%;
    margin-left: -16rem;
  }

  &-content {
    flex: 1;
    padding-right: 4rem;
    .about__header {
      padding-bottom: 1rem;
      color: #161f42;
      font-size: 40px;
      line-height: 128.34%;

      .join-2 {
        font-weight: 900;
        display: block;
      }
      .join-1 {
        display: block;
      }
    }

    .about__para {
      font-size: 14px;
      line-height: 175.78%;
      color: #5c5c5c;
      padding-bottom: 2rem;
    }
  }
}

@media screen and (max-width: 1024px) {
  .home__about {
    height: auto;
    margin-top: 1rem;
    &-content {
      padding-right: 0;
      text-align: center;
      margin-top: 1rem;
      .about__header {
        text-align: center;
      }
      .about__para {
        text-align: center;
      }
    }
    .about__img {
      margin-left: 0;
      flex: 1;
      height: auto;
      margin: 0.5rem 0;
    }
  }

  @media screen and (max-width: 320px) {
    .home__about {
      .about__img {
        display: none;
      }
    }
  }
}
</style>
