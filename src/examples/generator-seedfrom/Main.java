import dev.pseudata.Generator;

public class Main {
  public static void main(String[] args) {
    long seed = Generator.seedFrom("Hello, World!");
    Generator gen = new Generator(seed, 0);

    System.out.println(gen.nextInt());
  }
}
