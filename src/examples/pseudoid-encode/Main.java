import dev.pseudata.IDUtils;

public class Main {
  public static void main(String[] args) {
    String id = IDUtils.encodeId(42, 100, 1);

    System.out.println(id);
  }
}
