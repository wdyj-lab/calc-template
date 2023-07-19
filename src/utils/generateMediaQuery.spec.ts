import generateMediaQuery from "./generateMediaQuery";

describe("generateMediaQuery", () => {
  describe("쿼리 대상이 전체 기기일 때", () => {
    it('(breakpoints, "<=", "xxxl")의 결과로 빈 문자열이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery("<=", "xxxl");

      // then
      expect(query).toBe("");
    });

    it('(breakpoints, ">=", "xs")의 결과로 빈 문자열이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery(">=", "xs");

      // then
      expect(query).toBe("");
    });
  });

  describe("쿼리 대상이 존재하지 않을 때", () => {
    it('(breakpoints, ">", "xxxl")의 결과로 빈 문자열이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery(">", "xxxl");

      // then
      expect(query).toBe("");
    });

    it('(breakpoints, "<", "xs")의 결과로 빈 문자열이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery("<", "xs");

      // then
      expect(query).toBe("");
    });
  });

  describe(">=", () => {
    it('xxxl이 2541으로 설정되었을 때 (breakpoints, ">=", "xxxl")의 결과로 (min-width: 2541px)이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery(">=", "xxxl");

      // then
      expect(query).toBe("(min-width: 2541px)");
    });

    it('sm이 321으로 설정되었을 때 (breakpoints, ">=", "sm")의 결과로 (min-width: 321px)이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery(">=", "sm");

      // then
      expect(query).toBe("(min-width: 321px)");
    });
  });

  describe(">", () => {
    it('xxxl이 2541으로 설정되었을 때 (breakpoints, ">", "xxl")의 결과로 (min-width: 2541px)이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery(">", "xxl");

      // then
      expect(query).toBe("(min-width: 2541px)");
    });

    it('sm이 321으로 설정되었을 때 (breakpoints, ">", "xs")의 결과로 (min-width: 321px)이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery(">", "xs");

      // then
      expect(query).toBe("(min-width: 321px)");
    });
  });

  describe("<", () => {
    it('xxxl이 2541으로 설정되었을 때 (breakpoints, "<", "xxxl")의 결과로 (max-width: 2540px)이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery("<", "xxxl");

      // then
      expect(query).toBe("(max-width: 2540px)");
    });

    it('sm이 321으로 설정되었을 때 (breakpoints, "<", "sm")의 결과로 (max-width: 320px)이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery("<", "sm");

      // then
      expect(query).toBe("(max-width: 320px)");
    });
  });

  describe("<=", () => {
    it('xxxl이 2541으로 설정되었을 때 (breakpoints, "<=", "xxl")의 결과로 (max-width: 2540px)이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery("<=", "xxl");

      // then
      expect(query).toBe("(max-width: 2540px)");
    });

    it('sm이 321으로 설정되었을 때 (breakpoints, "<=", "xs")의 결과로 (max-width: 320px)이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery("<=", "xs");

      // then
      expect(query).toBe("(max-width: 320px)");
    });
  });

  describe("mediaType", () => {
    it('mediaType이 screen으로 설정된 경우 (breakpoints, "<=", "xs")의 결과로 screen and (max-width: 320px)이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery("<=", "xs", "screen");

      // then
      expect(query).toBe("screen and (max-width: 320px)");
    });

    it('mediaType이 only screen으로 설정된 경우 (breakpoints, ">=", "xs")의 결과로 only screen이 리턴돼야 한다.', () => {
      // given
      // when
      const query = generateMediaQuery(">=", "xs", "only screen");

      // then
      expect(query).toBe("only screen");
    });
  });
});
