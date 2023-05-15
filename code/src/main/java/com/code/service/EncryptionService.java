package com.code.service;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.data.annotation.Version;
import org.springframework.stereotype.Service;


@Service
public class EncryptionService {
    @Value("${key}")
    private String SECRET_KEY;  // 16 characters long
    private static final String ALGORITHM = "AES";

    public String encrypt(String data) throws Exception {
      if(data.equals("0")){
        return data;
      }
      Cipher cipher = Cipher.getInstance(ALGORITHM);
      cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM));
      return Base64.getEncoder().encodeToString(cipher.doFinal(data.getBytes()));
    }
}
