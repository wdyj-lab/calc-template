export const STABLE_TIME = 60 * 10000; // 10 minutes

export enum ShippingRequestMessageEnum {
  NO_REQUEST = '배송시 요청사항을 선택해주세요.',
  FRONT_DOOR = '부재시 문앞에 맡겨주세요.',
  CALL_BACK = '배송전에 미리 연락주세요.',
  SECURITY_OFFICE = '부재시 경비실에 맡겨주세요.',
  DIRECT_INPUT = '',
}
