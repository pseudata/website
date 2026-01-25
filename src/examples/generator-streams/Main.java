import dev.pseudata.Generator;

public class Main {
  public static void main(String[] args) {

    Generator gen0 = new Generator(42, 0);
    Generator gen1 = new Generator(42, 1);

    System.out.println(gen0.nextInt());
    System.out.println(gen1.nextInt());
  }
}
