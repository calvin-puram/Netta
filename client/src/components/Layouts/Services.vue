<template>
  <div class="home__service">
    <div class="home__service-unlimited">
      <img
        :src="unlimitedImg"
        alt="unilimted illustration"
        class="service__img"
      />
      <h2 class="service__header">Unlimited Access</h2>
      <p class="service__para">Unlimited access to information</p>
    </div>

    <div class="home__service-mobile">
      <img :src="mobileImg" alt="mobile illustration" class="service__img" />
      <h2 class="service__header">Access Anywhere</h2>
      <p class="service__para">
        Switch between your computer, tablet, or mobile device.
      </p>
    </div>

    <div class="home__service-mobile">
      <img :src="alldayImg" alt="mobile illustration" class="service__img" />
      <h2 class="service__header">Tech Connect</h2>
      <p class="service__para">Connect and build awesome products</p>
    </div>
  </div>
</template>

<script>
import unlimitedImg from '../../assets/service_unilimited.svg';
import mobileImg from '../../assets/service_mobile.svg';
import alldayImg from '../../assets/service_round.svg';
export default {
  data() {
    return {
      unlimitedImg,
      mobileImg,
      alldayImg
    };
  }
};
</script>

<style lang="scss" scoped>
.home__service {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 80%;
  margin: 1rem auto;
  height: 60vh;

  .service__header {
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 182.7%;
    text-align: center;
    color: #5c5c5c;
  }

  .service__para {
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #5c5c5c;
  }

  .service__img {
    display: block;
    margin: auto;
    margin-bottom: 2rem;
  }
}

@media screen and (max-width: 1024px) {
  .home__service {
    height: auto;
    justify-content: space-around;
  }
}
@media screen and (max-width: 600px) {
  .home__service {
    height: auto;
    justify-content: center;
  }
}
</style>
