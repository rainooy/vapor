import date from './dateFormat';

export default {
  normalizeNeu(neuAmount) {
    return neuAmount / Math.pow(10, 8);
  },
  digits(num) {
    return num ? String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : num
  },
  normalizeSize(size) {
    return size ? (size / 1024).toFixed(2) : size;
  },
  date,
  poolsFilter (data) {
    if (!data) return [];
    const pool = {};
    const add = (item) => {
      pool[item.name].fee = item.fee + pool[item.name].fee;
      pool[item.name].hash_rate = item.hash_rate + pool[item.name].hash_rate;
      pool[item.name].mined_block_count = item.mined_block_count + pool[item.name].mined_block_count;
      pool[item.name].percent = item.percent + pool[item.name].percent;
      pool[item.name].profit = item.profit + pool[item.name].profit;
    }

    data.map(item => {
      item.percent = Number(item.percent) * 100;
      return item;
    }).forEach(item => {
      pool[item.name] ? add(item) : (pool[item.name] = item);
    });
    
    return Object.values(pool);
  },
};