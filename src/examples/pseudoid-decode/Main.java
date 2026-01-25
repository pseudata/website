import dev.pseudata.IDUtils;
import dev.pseudata.IDUtils.IDComponents;

public class Main {
  public static void main(String[] args) {
    IDComponents comp = IDUtils.decodeId("00000000-0000-8002-a800-640000000001");

    System.out.print(comp.worldSeed + " " + comp.typeSeq + " " + comp.index);
  }
}
