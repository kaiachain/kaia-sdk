package org.utils;

import org.base.BaseTesting;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.crypto.transaction.type.TxType.Type;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Utils Tests")
public class UtilsTest extends BaseTesting {
  @Test
  @DisplayName("example test utils")
  void testUnitConversion() {
    assertNotNull(Type.ACCOUNT_UPDATE);
  }
}
