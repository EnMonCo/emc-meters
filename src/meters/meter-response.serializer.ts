import { Meter } from './entities/meter.entity';

const meterResponseSerializer = (meter: Meter) => {
  delete meter.password;
  delete meter.hash;
};

export default meterResponseSerializer;
