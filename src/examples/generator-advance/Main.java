import dev.pseudata.Generator;

public class Main {
  public static void main(String[] args) {

    var gen1 = new Generator(42, 0);
    var gen2 = new Generator(42, 0);

    gen1.advance(10_000_000);

    for (int i = 0; i < 10_000_000; i++) {
      gen2.nextInt();
    }

    var result1 = gen1.nextInt();
    var result2 = gen2.nextInt();

    if (result1 != result2) {
      throw new RuntimeException(
          String.format("Results don't match! Advance=%d, Loop=%d", result1, result2));
    }

    System.out.println((long) result1 & 0xFFFFFFFFL);
  }
}
