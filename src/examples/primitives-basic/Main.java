import dev.pseudata.Primitives;

public class Main {
  public static void main(String[] args) {

    Primitives prim = Primitives.newPrimitives(42, 100, 0);

    System.out.println(prim.id());
    System.out.println(prim.email());
    System.out.println(prim.genderedGivenName());
    System.out.println(prim.familyName());
    System.out.println(prim.city());
  }
}
