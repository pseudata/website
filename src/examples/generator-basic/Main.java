import dev.pseudata.Generator;

public class Main {
  public static void main(String[] args) {
    Generator gen = new Generator(42, 0);

    System.out.println(gen.nextInt());
  }
}
