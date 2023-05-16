package com.code.util.common;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class CommonUtil {
  public List<String> parseString(String input) {
    String[] splitted = input.replaceAll("\"", "").replace("[", "").replace("]", "").split(", ");
    List<String> resultList = new ArrayList<>(Arrays.asList(splitted));
    return resultList;
  }
}
